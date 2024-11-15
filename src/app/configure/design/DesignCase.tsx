'use client';

import HandleComponent from '@/components/custom/HandleComponent';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { BASE_PRICE, COLORS, FINISHES, MATERIALS, MODELS } from '@/constant';
import { useToast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { cn, formatPrice } from '@/lib/utils';
import { Description, Radio, RadioGroup } from '@headlessui/react';
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

interface DesignCaseProps {
    configId: string;
    originalImageUrl: string;
    imageDimensions: {
        width: number;
        height: number;
    };
}

type ColorOption = (typeof COLORS)[number];
type ModelOPtion = (typeof MODELS.options)[number];
type MaterialOption = (typeof MATERIALS.options)[number];
type FinishOption = (typeof FINISHES.options)[number];

interface OptionsState {
    color: ColorOption;
    model: ModelOPtion;
    material: MaterialOption;
    finish: FinishOption;
}
const DesignCase = ({
    configId,
    originalImageUrl,
    imageDimensions,
}: DesignCaseProps) => {
    const { toast } = useToast();
    const router = useRouter();

    const [options, setOptions] = useState<OptionsState>({
        color: COLORS[0],
        model: MODELS.options[6],
        material: MATERIALS.options[0],
        finish: FINISHES.options[0],
    });

    const [renderedDimension, setRenderedDimension] = useState({
        width: imageDimensions.width / 4,
        height: imageDimensions.height / 4,
    });

    const [renderedPosition, setRenderedPosition] = useState({
        x: 150,
        y: 180,
    });

    const phoneCaseRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { startUpload } = useUploadThing('imageUploader');

    /**
     * Save the current configuration to the server by generating an image
     * that includes the user-uploaded image and the design elements.
     *
     * This will create a new configuration on the server and redirect the user
     * to the preview page.
     *
     * If an error occurs during the save (for example, if the user's image
     * upload fails), an error toast will be displayed.
     */
    async function saveConfiguration() {
        try {
            const {
                left: caseLeft,
                top: caseTop,
                width,
                height,
            } = phoneCaseRef.current!.getBoundingClientRect();

            const { left: containerLeft, top: containerTop } =
                containerRef.current!.getBoundingClientRect();

            const leftOffset = caseLeft - containerLeft;
            const topOffset = caseTop - containerTop;

            const actualX = renderedPosition.x - leftOffset;
            const actualY = renderedPosition.y - topOffset;

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            const userImage = new Image();
            userImage.crossOrigin = 'anonymous';
            userImage.src = originalImageUrl;
            await new Promise((resolve) => (userImage.onload = resolve));

            ctx?.drawImage(
                userImage,
                actualX,
                actualY,
                renderedDimension.width,
                renderedDimension.height,
            );

            const base64 = canvas.toDataURL();
            const base64Data = base64.split(',')[1];

            const blob = base64ToBlob(base64Data, 'image/png');
            const file = new File([blob], 'filename.png', {
                type: 'image/png',
            });

            await startUpload([file], { configId });
        } catch (err) {
            toast({
                title: 'Something went wrong',
                description:
                    'There was a problem saving your config, please try again.',
                variant: 'destructive',
            });
        }
    }

    /**
     * Convert a base64-encoded string to a blob.
     *
     * @param {string} base64 The base64-encoded string.
     * @param {string} mimeType The MIME type of the blob.
     * @returns {Blob} The blob.
     */
    function base64ToBlob(base64: string, mimeType: string) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }

    return (
        <div className='relative mb-20 mt-20 grid grid-cols-1 lg:grid-cols-3'>
            {/* Left Side - Image Drag and Resize */}
            <div
                ref={containerRef}
                className='relative flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:col-span-2'
            >
                <div className='pointer-events-none relative aspect-[896/1831] w-60'>
                    <AspectRatio
                        ref={phoneCaseRef}
                        ratio={896 / 1831}
                        className='pointer-events-none relative z-50 aspect-[896/1831] w-full'
                    >
                        <NextImage
                            fill
                            alt='phone template'
                            src='/images/phone-template.png'
                            className='pointer-events-none z-50 select-none'
                        />
                    </AspectRatio>
                    <div className='absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
                    <div
                        className={cn(
                            'absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]',
                            `${options.color.bg}`,
                        )}
                    />
                </div>
                <Rnd
                    default={{
                        x: 150,
                        y: 180,
                        width: imageDimensions.width / 4,
                        height: imageDimensions.height / 4,
                    }}
                    onResizeStop={(_, __, ref, ___, { x, y }) => {
                        setRenderedDimension({
                            height: parseInt(ref.style.height.slice(0, -2)),
                            width: parseInt(ref.style.width.slice(0, -2)),
                        });

                        setRenderedPosition({ x, y });
                    }}
                    onDragStop={(_, data) => {
                        const { x, y } = data;
                        setRenderedPosition({ x, y });
                    }}
                    className='absolute z-20 border-[3px] border-primary'
                    lockAspectRatio
                    resizeHandleComponent={{
                        bottomLeft: <HandleComponent />,
                        bottomRight: <HandleComponent />,
                        topLeft: <HandleComponent />,
                        topRight: <HandleComponent />,
                    }}
                >
                    <div className='relative size-full'>
                        <NextImage
                            fill
                            src={originalImageUrl}
                            alt='Uploaded Image'
                            className='pointer-events-none'
                        />
                    </div>
                </Rnd>
            </div>

            {/* Right Side - Select Addons */}

            <div className='col-span-full flex h-[37.5rem] w-full flex-col bg-white lg:col-span-1'>
                <ScrollArea className='relative flex-1 overflow-y-auto'>
                    <div
                        aria-hidden='true'
                        className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white'
                    />
                    <div className='px-8 pb-12 pt-8'>
                        <h2 className='text-3xl font-bold tracking-tight'>
                            Customize your case
                        </h2>
                        <Separator className='my-6' />
                        <div className='relative mt-4 flex h-full flex-col justify-between gap-6'>
                            <RadioGroup
                                value={options.color}
                                onChange={(value) => {
                                    setOptions((prev) => ({
                                        ...prev,
                                        color: value,
                                    }));
                                }}
                            >
                                <Label className='text-md font-medium'>
                                    Color: {options.color.name}
                                </Label>
                                <div className='mt-3 flex items-center gap-4 lg:grid lg:grid-cols-4'>
                                    {COLORS.map((color: ColorOption) => (
                                        <Radio
                                            key={color.name}
                                            value={color}
                                            className={({ checked }) =>
                                                cn(
                                                    'relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-transparent p-0.5 focus:outline-none focus:ring-0 active:outline-none active:ring-0',
                                                    {
                                                        [`${color.border}`]:
                                                            checked,
                                                    },
                                                )
                                            }
                                        >
                                            <span
                                                className={cn(
                                                    `${color.bg}`,
                                                    'h-full w-full rounded-full border border-black border-opacity-10',
                                                )}
                                            />
                                        </Radio>
                                    ))}
                                </div>
                            </RadioGroup>
                            <div className='relative flex w-full flex-col gap-3'>
                                <Label className='text-md font-medium'>
                                    Model
                                </Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant='outline'
                                            className='w-full justify-between px-6 py-4 text-left text-sm font-medium'
                                            role='combobox'
                                        >
                                            {options.model.name}
                                            <ChevronsUpDown className='ml-2 h-5 w-5 shrink-0 opacity-50' />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-full'>
                                        {MODELS.options.map((model) => (
                                            <DropdownMenuItem
                                                key={model.name}
                                                onClick={() =>
                                                    setOptions((prev) => ({
                                                        ...prev,
                                                        model,
                                                    }))
                                                }
                                                className={cn(
                                                    'flex cursor-default select-none items-center justify-between gap-1 px-2 py-1.5 text-sm leading-6 hover:bg-zinc-200',
                                                    {
                                                        'bg-zinc-200':
                                                            model.name ===
                                                            options.model.name,
                                                    },
                                                )}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-5 w-5',
                                                        model.name ===
                                                            options.model.name
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                                {model.name}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {[MATERIALS, FINISHES].map(
                                ({ name, options: selectableOptions }) => (
                                    <RadioGroup
                                        key={name}
                                        value={options[name]}
                                        onChange={(val) => {
                                            setOptions((prev) => ({
                                                ...prev,
                                                [name]: val,
                                            }));
                                        }}
                                    >
                                        <Label className='text-md font-medium'>
                                            {name.slice(0, 1).toUpperCase() +
                                                name.slice(1)}
                                        </Label>
                                        <div className='mt-3 space-y-4'>
                                            {selectableOptions.map((option) => (
                                                <Radio
                                                    key={option.value}
                                                    value={option}
                                                    className={({ checked }) =>
                                                        cn(
                                                            'relative block cursor-pointer items-center rounded-lg border-2 border-zinc-200 bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none focus:ring-0 sm:flex sm:justify-between',
                                                            {
                                                                'border-primary':
                                                                    checked,
                                                            },
                                                        )
                                                    }
                                                >
                                                    <span className='flex items-center'>
                                                        <span className='flex flex-col text-sm'>
                                                            <Label className='font-medium text-gray-900'>
                                                                {option.label}
                                                            </Label>

                                                            {option.description && (
                                                                <Description
                                                                    as='span'
                                                                    className='text-gray-500'
                                                                >
                                                                    <span className='block sm:inline'>
                                                                        {
                                                                            option.description
                                                                        }
                                                                    </span>
                                                                </Description>
                                                            )}
                                                        </span>
                                                    </span>

                                                    <Description
                                                        as='span'
                                                        className='mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'
                                                    >
                                                        <span className='font-medium text-gray-900'>
                                                            {formatPrice(
                                                                option.price /
                                                                    100,
                                                            )}
                                                        </span>
                                                    </Description>
                                                </Radio>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                ),
                            )}
                        </div>
                    </div>
                </ScrollArea>

                <div className='h-16 w-full bg-white px-8'>
                    <Separator />
                    <div className='mt-2 size-full items-center justify-end'>
                        <div className='flex w-full items-center gap-6'>
                            <p className='whitespace-nowrap font-medium'>
                                {formatPrice(
                                    (BASE_PRICE +
                                        options.finish.price +
                                        options.material.price) /
                                        100,
                                )}
                            </p>
                            <Button
                                // isLoading={isPending}
                                // disabled={isPending}
                                // loadingText='Saving'
                                onClick={() => saveConfiguration()}
                                size='sm'
                                className='w-full'
                            >
                                Continue
                                <ArrowRight className='ml-1.5 inline h-4 w-4' />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignCase;
