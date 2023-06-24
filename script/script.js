﻿async function downloadFileFromStream(fileName, contentStreamReference)
{
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.download = fileName;
    link.href = url
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
}

async function openFileInNewTab(array, mimeType)
{
    var file = new Blob([array], { type: mimeType });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
}