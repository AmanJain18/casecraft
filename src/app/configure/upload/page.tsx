'use client';

import { useState, useTransition } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { Loader2, MousePointerSquareDashed, UploadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useUploadThing } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const Page = () => {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  // const [files, setFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const { configId } = data.serverData;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
    onUploadError: (error) => {
      console.log(error);
    },
  });
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [firstFile] = rejectedFiles;
    setIsDragOver(false);
    if (firstFile.errors[0].code === 'file-too-large') {
      toast({
        title: 'File is too large',
        description: 'Please choose a file under 8MB',
        variant: 'destructive',
      });
    } else if (firstFile.errors[0].code === 'file-invalid-type') {
      toast({
        title: `${firstFile.file.type} type is not supported`,
        description:
          'Please choose a image from the supported formats: PNG, JPG, JPEG',
        variant: 'destructive',
      });
    }
  };
  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, {
      configId: undefined,
    });
    setIsDragOver(false);
  };

  return (
    <div
      className={cn(
        'relative h-full w-full flex-1 my-16 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center',
        { 'ring-blue-900/10 bg-blue-900/10': isDragOver }
      )}
    >
      <div className="relative flex flex-1 flex-col justify-center items-center w-full">
        <Dropzone
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept={{
            'image/*': ['.png', '.jpg', '.jpeg'],
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="flex flex-1 flex-col items-center justify-center w-full h-full"
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <div className="flex flex-col items-center justify-center">
                  {isDragOver ? (
                    <>
                      <MousePointerSquareDashed className="w-10 h-10 text-primary" />
                      <p className="mt-2 text-sm text-zinc-700">
                        <span className="font-semibold">Drop file</span> to
                        upload
                      </p>
                    </>
                  ) : isUploading || isPending ? (
                    <>
                      <Loader2 className="w-10 h-10 text-primary animate-spin" />
                      {isUploading ? (
                        <>
                          <p className="mt-2 text-sm text-zinc-700">
                            Uploading...
                          </p>
                          <Progress
                            value={uploadProgress}
                            className="mt-2 h-2 w-40 bg-gray-300"
                          />
                        </>
                      ) : (
                        <p className="mt-2 text-sm text-zinc-700">
                          Redirecting, please wait...
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-10 h-10 text-primary" />
                      <p className="mt-2 text-sm text-zinc-700">
                        <span className="font-semibold">Drag and drop</span>{' '}
                        your image here, or{' '}
                        <span className="font-semibold">
                          click here to browse
                        </span>
                      </p>
                    </>
                  )}

                  {isPending ? null : (
                    <p className="mt-2 text-sm text-zinc-700">
                      <span className="font-semibold">Supported formats:</span>{' '}
                      PNG, JPG, JPEG
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;
