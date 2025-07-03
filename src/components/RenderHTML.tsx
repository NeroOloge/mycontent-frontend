import DOMPurify from 'dompurify'; // Sanitization library

type Props = { content: string, className: string }

function RenderHTML({ content, className }: Props) {
  let cleanHTML = DOMPurify.sanitize(content);
  cleanHTML = cleanHTML.replace(/<p>(\s|<br\s*\/?>)*<\/p>/g, '<p>&nbsp;</p>');

  return <div className={className} dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

export default RenderHTML