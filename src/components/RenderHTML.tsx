import DOMPurify from 'dompurify'; // Sanitization library

type Props = { content: string, className: string }

function RenderHTML({ content, className }: Props) {
  const cleanHTML = DOMPurify.sanitize(content); // Sanitize before rendering

  return <div className={className} dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

export default RenderHTML