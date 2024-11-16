'use server';

import client from '@/db';
import {
    CaseColor,
    CaseFinish,
    CaseMaterial,
    PhoneModel,
} from '@prisma/client';

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
