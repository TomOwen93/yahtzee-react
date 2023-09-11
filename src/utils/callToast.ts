export const callToast = (
    toast: any,
    title: string,
    description: string,
    status: string,
    duration: number
) =>
    toast({
        title,
        description,
        status,
        duration,
        isClosable: true,
    });
