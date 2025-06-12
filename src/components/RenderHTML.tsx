import DOMPurify from 'dompurify'; // Sanitization library

function RenderHTML({ content }: { content: string }) {
  const cleanHTML = DOMPurify.sanitize(content); // Sanitize before rendering

  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

export default RenderHTML