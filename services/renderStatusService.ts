const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined")
}

export async function getRenderStatus() {

  const response = await fetch(
    `${API_URL}/render-status`
  )

  if (!response.ok) {

    let errorMessage = "Failed to fetch render status"

    try {

      const data = await response.json()

      errorMessage =
        data.detail ||
        data.error ||
        JSON.stringify(data)

    } catch {

      errorMessage = await response.text()
    }

    throw new Error(errorMessage)
  }

  return response.json()
}

export async function renderVideo(
  clip1: File | null,
  clip2: File | null,
  clip1Url?: string,
  clip2Url?: string,
  autosync?: boolean,
  outputName?: string
) {

  const formData = new FormData()

  if (clip1) {
    formData.append("clip1", clip1)
  }

  if (clip2) {
    formData.append("clip2", clip2)
  }

  if (clip1Url) {
    formData.append("clip1_url", clip1Url)
  }

  if (clip2Url) {
    formData.append("clip2_url", clip2Url)
  }

  formData.append(
    "auto_sync",
    String(autosync ?? true)
  )

  const safeOutputName =
    outputName?.trim() ||
    `render_${Date.now()}`

  formData.append(
    "output_name",
    safeOutputName
  )

  console.log(
    "Submitting render with output_name:",
    safeOutputName
  )

  const response = await fetch(
    `${API_URL}/render`,
    {
      method: "POST",
      body: formData,
    }
  )

  if (!response.ok) {

    let errorMessage = "Unknown render error"

    try {

      const data = await response.json()

      errorMessage =
        data.detail ||
        data.error ||
        JSON.stringify(data)

    } catch {

      errorMessage = await response.text()
    }

    console.error(
      "BACKEND ERROR:",
      errorMessage
    )

    throw new Error(errorMessage)
  }

  return response.json()
}