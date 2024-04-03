import { isUndefined } from 'lodash';

export function objectToFormData(data: any) {
    if (typeof data != 'object') return null;
    const formData = new FormData();
    for (const key in data) {
        if (data[key] instanceof Array) {
            for (let i = 0; i < data[key].length; i++) {
                formData.append(key, data[key][i].originFileObj as Blob);
            }
            continue;
        }
        if (data[key]?.fileList) {
            for (let i = 0; i < data[key].fileList.length; i++) {
                formData.append(key, data[key].fileList[i].originFileObj as Blob);
            }
            continue;
        }
        if (data[key] instanceof File) {
            formData.append(key, data[key]);
            continue;
        }
        if (data[key] instanceof Object) {
            formData.append(key, JSON.stringify(data[key]));
            continue;
        }
        if (!isUndefined(data[key])) formData.append(key, data[key]);
    }
    return formData;
}
