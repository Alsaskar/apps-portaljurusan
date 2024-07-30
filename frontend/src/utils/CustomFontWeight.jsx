import Quill from 'quill';

const FontAttributor = Quill.import('formats/font');
FontAttributor.whitelist = ['normal', 'medium', 'bold'];

const Font = Quill.import('attributors/class/font');
Font.whitelist = ['normal', 'medium', 'bold'];
Quill.register(Font, true);

const SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ['medium'];
Quill.register(SizeStyle, true);

export default Quill;
