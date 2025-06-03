export const uploadFile = async (acceptedFiles: File[]) => {
    try {
        const uploadPromises = acceptedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "joyboybeauty"); // Thay bằng preset của bạn
            formData.append("folder", "JOYBOY");
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dwu92ycra/image/upload",
                {
                    method: "POST",
                    body: formData
                }
            );
            const data = await response.json();
            console.log("check data review ", data);
            if (response.ok) {
                return data.secure_url;
            }
            throw new Error(data.error?.message || "Upload failed");
        });

        const urls = await Promise.all(uploadPromises);
        return urls;
        console.log("Uploaded URLs:", urls);
    } catch (err) {
        console.error(err);
    } finally {
    }
};
