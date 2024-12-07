export const addDOMEventListener = (event: string, selector: string, callback: Function) => {
  document.addEventListener(event, function(ev){
    let target: HTMLElement | null = ev.target as HTMLElement;

    while (target && !target.matches(selector)) {
      target = target.parentElement;
    }

    if(target){
      callback(ev, target)
    }
  });
}

export const copyToClipboard = async (text: string) => {
  const clipboardItem = new ClipboardItem({'text/plain': new Blob([text], {type:'text/plain'}) })
  await navigator.clipboard.write([clipboardItem])
}

export const getTextFromClipboard = async (): Promise<string> => {
  try {
    return await navigator.clipboard.readText();
  } catch (error) {
    throw error;
  }
}

export const downloadStringAsFile = async (
    content: string,
    filename: string = "output.txt"
): Promise<void> => {
  const blob = new Blob([content], { type: "text/plain" });

  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(blobUrl);
}

export const getDataContentFromFile = async (
    callback: (param: string) => void,
    props?: { allowedFileTypes?: string[]; }
): Promise<string> => {
  const fileInputElement = document.createElement('input');
  fileInputElement.type = 'file';
  fileInputElement.style.display = 'none';
  if(props?.allowedFileTypes && props?.allowedFileTypes?.length >= 1){
    fileInputElement.accept = props.allowedFileTypes.join(', ')
  }

  document.body.appendChild(fileInputElement);

  try {
    fileInputElement.addEventListener('change', async () => {
      const selectedFile = fileInputElement.files?.[0];

      if(selectedFile){
        const data = await selectedFile.text()
        callback(data)
      }
    })

    fileInputElement.click();
  } catch (e: any) {

  } finally {
    fileInputElement.remove();
  }
  return '';
}