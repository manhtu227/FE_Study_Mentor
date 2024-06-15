// export const useDownloadFileApi = () => {
//     return useMutation({
//         mutationFn: (key: string) => downloadFileApi({ key }),
//         onSuccess: async (data) => {
//             await downloadUrl(data.data.metadata.presignedUrl);
//         },
//         onError: (error) => {
//             error;
//         },
//     });
// };
