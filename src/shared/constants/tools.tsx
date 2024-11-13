import {
  AiOutlineCompress, AiOutlineFile, AiOutlineFileExcel, AiOutlineFileGif, AiOutlineFileSync, AiOutlineFileText, AiOutlineScissor, AiOutlineShareAlt,
} from 'react-icons/ai';
import {
  BsCircle, BsFiletypeCsv, BsFiletypeXml, BsFillDropletFill, BsJustifyLeft,
} from 'react-icons/bs';
import {
  FaCameraRetro, FaExchangeAlt, FaFileAudio, FaFileCsv, FaFileExcel, FaFileImage, FaFilePdf, FaFileVideo, FaFileWord, FaPenFancy, FaSpellCheck,
} from 'react-icons/fa';
import { FiScissors } from 'react-icons/fi';
import {
  MdAutorenew,
  MdBlurOn, MdEdit, MdOutlineDescription, MdOutlineGridOn, MdOutlineTouchApp,
} from 'react-icons/md';

import RemoveBackgroundImage from '@/assets/images/features/remove-the-background.webp';
import CutOutObjectImage from '@/assets/images/features/cut-out-an-object.webp';
import PickUpObjectImage from '@/assets/images/features/pick-up-an-object.jpg';
import EditBackgroundImage from '@/assets/images/features/edit-the-background.webp';
import BlackWhiteImage from '@/assets/images/features/black-and-white.webp';
import RoundImage from '@/assets/images/features/round.webp';
import PixelateImage from '@/assets/images/features/pixelate.webp';
import BlurImage from '@/assets/images/features/blur.webp';
import SummaryImage from '@/assets/images/features/summary.webp';
import RewriterImage from '@/assets/images/features/rewriter.webp';
import EssayImage from '@/assets/images/features/essay.png';
import GrammarImage from '@/assets/images/features/grammar-checker.webp';

import { Feature } from '../types/common';

export const image: Feature[] = [
  {
    id: 1,
    label: 'image.remove-the-background',
    Icon: FiScissors,
    route: '/image/remove-the-background',
    Image: RemoveBackgroundImage,
    api_key: 'remove_background',
  },
  {
    id: 2,
    label: 'image.cut-out-an-object',
    Icon: AiOutlineScissor,
    route: '/image/cut-out-an-object',
    Image: PickUpObjectImage,
    api_key: 'cut_out_object',
  },
  {
    id: 3,
    label: 'image.pick-up-an-object',
    Icon: MdOutlineTouchApp,
    route: '/image/pick-up-an-object',
    Image: CutOutObjectImage,
    api_key: 'pick_up_object',
  },
  {
    id: 4,
    label: 'image.edit-the-background',
    Icon: MdEdit,
    route: '/image/edit-the-background',
    Image: EditBackgroundImage,
    api_key: 'edit_background',
  },
  {
    id: 5,
    label: 'image.black-and-white',
    Icon: BsFillDropletFill,
    route: '/image/black-and-white',
    Image: BlackWhiteImage,
    api_key: 'black_and_white',
  },
  {
    id: 6,
    label: 'image.round',
    Icon: BsCircle,
    route: '/image/round',
    Image: RoundImage,
    api_key: 'round_image',
  },
  {
    id: 7,
    label: 'image.pixelate',
    Icon: MdOutlineGridOn,
    route: '/image/pixelate',
    Image: PixelateImage,
    api_key: 'pixelate_image',
  },
  {
    id: 8,
    label: 'image.blur',
    Icon: MdBlurOn,
    route: '/image/blur',
    Image: BlurImage,
    api_key: 'blur_image',
  },
  {
    id: 9,
    label: 'image.compress',
    Icon: AiOutlineCompress,
    route: '/image/compress',
    api_key: 'compress_image',
  },
  {
    id: 10,
    label: 'image.heic-to-jpg',
    Icon: FaExchangeAlt,
    route: '/image/heic-to-jpg',
    api_key: 'heif_to_jpg',
  },
  {
    id: 11,
    label: 'image.png-to-jpg',
    Icon: FaFileImage,
    route: '/image/png-to-jpg',
    api_key: 'png_to_jpg',
  },
  {
    id: 12,
    label: 'image.raw-to-jpg',
    Icon: FaCameraRetro,
    route: '/image/raw-to-jpg',
    api_key: 'raw_to_jpg',
  },
  {
    id: 13,
    label: 'image.tiff-to-jpg',
    Icon: FaFileImage,
    route: '/image/tiff-to-jpg',
    api_key: 'tiff_to_jpg',
  },
];

export const write: Feature[] = [
  {
    id: 14,
    label: 'write.summary',
    Icon: AiOutlineFileText,
    route: '/write/summary',
    Image: SummaryImage,
    api_key: 'generate_summary',
  },
  {
    id: 15,
    label: 'write.rewriter',
    Icon: MdAutorenew,
    route: '/write/rewriter',
    Image: RewriterImage,
    api_key: 'rewrite_text',
  },
  {
    id: 16,
    label: 'write.essay',
    Icon: FaPenFancy,
    route: '/write/essay',
    Image: EssayImage,
    api_key: 'essay_writer',
  },
  {
    id: 18,
    label: 'write.grammar-checker',
    Icon: FaSpellCheck,
    route: '/write/grammar-checker',
    Image: GrammarImage,
    api_key: 'grammar_checker',
  },
  {
    id: 17,
    label: 'write.paragraph',
    Icon: BsJustifyLeft,
    route: '/write/paragraph',
    api_key: 'paragraph_writer',
  },
  {
    id: 19,
    label: 'write.post',
    Icon: AiOutlineShareAlt,
    route: '/write/post',
    api_key: 'post_writer',
  },
  {
    id: 20,
    label: 'write.code-documentation',
    Icon: MdOutlineDescription,
    route: '/write/code-documentation',
    api_key: 'document_code',
  },
];

export const file: Feature[] = [
  {
    id: 21,
    label: 'file.xml-to-json',
    Icon: AiOutlineFileSync,
    route: '/file/xml-to-json',
    api_key: 'xml_to_json',
  },
  {
    id: 22,
    label: 'file.json-to-xml',
    Icon: BsFiletypeXml,
    route: '/file/json-to-xml',
    api_key: 'json_to_xml',
  },
  {
    id: 23,
    label: 'file.xml-to-csv',
    Icon: FaFileCsv,
    route: '/file/xml-to-csv',
    api_key: 'xml_to_csv',
  },
  {
    id: 24,
    label: 'file.json-to-csv',
    Icon: BsFiletypeCsv,
    route: '/file/json-to-csv',
    api_key: 'json_to_csv',
  },
  {
    id: 25,
    label: 'file.xls-to-csv',
    Icon: AiOutlineFileExcel,
    route: '/file/xls-to-csv',
    api_key: 'xls_to_csv',
  },
  {
    id: 26,
    label: 'file.xls-to-json',
    Icon: FaFileExcel,
    route: '/file/xls-to-json',
    api_key: 'xls_to_json',
  },
  {
    id: 27,
    label: 'file.xls-to-xml',
    Icon: AiOutlineFile,
    route: '/file/xls-to-xml',
    api_key: 'xls_to_xml',
  },
];

export const pdf: Feature[] = [
  {
    id: 28,
    label: 'pdf.docx-to-pdf',
    Icon: FaFilePdf,
    route: '/pdf/docx-to-pdf',
    api_key: 'pdf_to_docx',
  },
  {
    id: 29,
    label: 'pdf.pdf-to-docx',
    Icon: FaFileWord,
    route: '/pdf/pdf-to-docx',
    api_key: 'docx_to_pdf',
  },
  {
    id: 30,
    label: 'pdf.compress',
    Icon: AiOutlineCompress,
    route: '/pdf/compress',
    api_key: 'compress_pdf',
  },
];

export const video: Feature[] = [
  {
    id: 31,
    label: 'video.compress',
    Icon: AiOutlineCompress,
    route: '/video/compress',
    api_key: 'compress_mp4',
  },
  {
    id: 32,
    label: 'video.video-to-gif',
    Icon: AiOutlineFileGif,
    route: '/video/video-to-gif',
    api_key: 'mp4_to_gif',
  },
  {
    id: 33,
    label: 'video.mkv-to-mp4',
    Icon: FaFileVideo,
    route: '/video/mkv-to-mp4',
    api_key: 'mkv_to_mp4',
  },
  {
    id: 34,
    label: 'video.mp4-to-mp3',
    Icon: FaFileAudio,
    route: '/video/mp4-to-mp3',
    api_key: 'mp4_to_mp3',
  },
];

export const all: Feature[] = [...image, ...write, ...file, ...pdf, ...video];
