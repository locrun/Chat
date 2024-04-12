import DOMPurify from 'dompurify';
export default html => ({ __html: DOMPurify.sanitize(html) });
