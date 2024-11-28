'use server';

import client from '@/db';
import {
    CaseColor,
    CaseFinish,
    CaseMaterial,
    PhoneModel,
} from '@prisma/client';
import { z } from 'zod';

const fetchConfigSchema = z.object({
    configId: z.string(),
});

export async function getConfigDetails(configId: string) {
    fetchConfigSchema.parse({ configId });

    // Fetch configuration from database
    const config = await client.configuration.findUnique({
        where: { id: configId },
    });

    if (!config) {
        throw new Error(`Configuration with ID ${configId} not found.`);
    }

    return {
        configId: config.id,
        color: config.color || null,
        material: config.material || null,
        finish: config.finish || null,
        model: config.model || null,
    };
}

export type SaveConfigArgs = {
    configId: string;
    color: CaseColor;
    finish: CaseFinish;
    material: CaseMaterial;
    model: PhoneModel;
};

export const saveConfig = async ({
    configId,
    color,
    finish,
    material,
    model,
}: SaveConfigArgs) => {
    return client.configuration.update({
        where: { id: configId },
        data: { color, finish, material, model },
    });
};
