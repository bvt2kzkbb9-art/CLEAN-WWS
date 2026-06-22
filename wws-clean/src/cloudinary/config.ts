export const getCloudinaryConfig = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    console.warn(
      'Cloudinary is not configured. Image uploads will not work. ' +
      'Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env.local'
    )
  }

  return {
    cloudName,
    uploadPreset,
  }
}

export const uploadImage = async (file: File): Promise<{ secure_url: string }> => {
  const { cloudName, uploadPreset } = getCloudinaryConfig()

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Cloudinary is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env.local'
    )
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to upload image: ${error.error?.message || 'Unknown error'}`)
  }

  return response.json()
}
