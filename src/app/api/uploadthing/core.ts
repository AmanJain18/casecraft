import { createUploadthing, type FileRouter } from 'uploadthing/next';
import * as z from 'zod';
import sharp from 'sharp';
import { createConfiguration, updateConfiguration } from '@/db';

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: '8MB' } })
        .input(
            z.object({
                configId: z.string().optional(),
            }),
        )
        .middleware(async ({ input }) => {
            return { input };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { configId } = metadata.input;

            const res = await fetch(file.url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const buffer = await res.arrayBuffer();
            const imageMetadata = await sharp(buffer).metadata();

            const { width, height } = imageMetadata;

            if (!configId) {
                const configuration = await createConfiguration(
                    width || 500,
                    height || 500,
                    file.url,
                );
                return { configId: configuration.id };
            } else {
                const updatedConfiguration = await updateConfiguration(
                    configId,
                    file.url,
                );

                return { configId: updatedConfiguration?.id };
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
