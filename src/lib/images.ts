import type { ImageMetadata } from 'astro';

import fieldsOfColor from '../assets/images/fields-of-color.webp';
import dryingFieldMorning from '../assets/images/drying-field-morning.webp';
import holdingBlocks from '../assets/images/holding-blocks.webp';
import dyeTrays from '../assets/images/dye-trays.webp';
import printerAtTable from '../assets/images/printer-at-table.webp';
import printingAjrakhTable from '../assets/images/printing-ajrakh-table.webp';
import indigoVats from '../assets/images/indigo-vats.webp';
import indigoVatDip from '../assets/images/indigo-vat-dip.webp';
import scarvesDryingBalcony from '../assets/images/scarves-drying-balcony.webp';
import khilana from '../assets/images/khilana.webp';
import priestKing from '../assets/images/priest-king.webp';
import vijendraAndYash from '../assets/images/vijendra-and-yash-chhipa.webp';
import deepakChhipa from '../assets/images/deepak-chhipa.webp';
import anupChhipa from '../assets/images/anup-chhipa.webp';
import jeremyCarver2010 from '../assets/images/jeremy-with-master-carver-2010.webp';
import jeremyDye2010 from '../assets/images/jeremy-stirring-dye-2010.webp';
import jeremyField2010 from '../assets/images/jeremy-indigo-field-2010.webp';
import jeremyPrinters2010 from '../assets/images/jeremy-with-printers-2010.webp';
import collaborationsMosaic from '../assets/images/collaborations-mosaic.webp';
import studioBagruMural from '../assets/images/studio-bagru-mural.webp';
import guestPrinting from '../assets/images/guest-learning-to-print.webp';
import jeremy2026 from '../assets/images/jeremy-fritzhand-2026.webp';

export const PHOTOS = {
  fieldsOfColor,
  dryingFieldMorning,
  holdingBlocks,
  dyeTrays,
  printerAtTable,
  printingAjrakhTable,
  indigoVats,
  indigoVatDip,
  scarvesDryingBalcony,
  khilana,
  priestKing,
  vijendraAndYash,
  deepakChhipa,
  anupChhipa,
  jeremyCarver2010,
  jeremyDye2010,
  jeremyField2010,
  jeremyPrinters2010,
  collaborationsMosaic,
  studioBagruMural,
  guestPrinting,
  jeremy2026,
} as const;

export interface ChapterVisual {
  image: ImageMetadata;
  alt: string;
  caption: string;
  credit: string;
}

export const CHAPTER_VISUALS: Record<string, ChapterVisual> = {
  'block-printing-in-ten-minutes': {
    image: holdingBlocks,
    alt: 'Master Chhipa printer in Bagru pressing a carved teakwood block onto indigo and ochre medallion cotton',
    caption: 'A master printer in Bagru aligning a carved woodblock across multi-color cotton yardage.',
    credit: 'Bagru, Rajasthan · Studio Bagru Archive',
  },
  'real-vs-fake-block-printing': {
    image: khilana,
    alt: 'Macro view of Khilana hand block printed cotton created by Chandrakanta Chhipa showing subtle hand registration',
    caption: 'Khilana, created by Chandrakanta Chhipa, 2018, ©Mahila Print — crisp hand-stamped registration on cotton.',
    credit: 'Mahila Print · Bagru, Rajasthan',
  },
  'complete-guide-to-hand-block-printing': {
    image: printerAtTable,
    alt: 'Master Chhipa printer stamping a carved wooden block onto black and madder red floral fabric at a padded table',
    caption: 'Rhythmic stamping at a padded patia printing table in Bagru using natural syahi black and madder red.',
    credit: 'Bagru, Rajasthan · Studio Bagru Archive',
  },
  'woodblock-carving-teak-and-sheesham': {
    image: deepakChhipa,
    alt: 'Deepak Chhipa standing in front of a floor-to-ceiling wall of hand-carved floral and animal teakwood printing blocks',
    caption: 'Deepak Chhipa beside a workshop wall of seasoned, hand-carved teakwood and sheesham printing blocks.',
    credit: 'Bagru, Rajasthan · Studio Bagru Archive',
  },
  'bagru-dabu-mud-resist-printing': {
    image: indigoVatDip,
    alt: 'Dabu mud-resist printed cotton lifted dripping from a deep natural indigo dye vat',
    caption: 'Mud-resist dabu cotton emerging from a fermented indigo vat before final washing reveals the pattern.',
    credit: 'Bagru, Rajasthan · Studio Bagru Archive',
  },
  'sanganer-and-ajrakh-traditions': {
    image: priestKing,
    alt: 'Steatite bust of the Indus Valley Priest-King from Mohenjo-daro wearing a trefoil-patterned cloak',
    caption: 'The Mohenjo-daro Priest-King (c. 2000 BCE): a 17.5 cm steatite bust draped in repeating trefoils.',
    credit: 'The Repeating Hand · Studio Bagru Archive',
  },
  'natural-dyes-and-mordants-for-block-printing': {
    image: dyeTrays,
    alt: 'Overhead view of three wooden kunda dye trays filled with kashish brown, syahi iron black, and harda yellow felt pads',
    caption: 'Three wooden kunda color trays loaded with kashish brown, fermented syahi iron black, and harda yellow.',
    credit: 'Bagru, Rajasthan · Studio Bagru Archive',
  },
  'fabric-preparation-scouring-and-washing': {
    image: scarvesDryingBalcony,
    alt: 'Freshly dyed madder pink and turmeric gold hand block printed mulmul scarves drying in the Rajasthan sun',
    caption: 'Hand block printed mulmul scarves drying in open Rajasthan air after final dye-bath washing.',
    credit: 'Bagru, Rajasthan · Studio Bagru Archive',
  },
  'ethical-block-printing-supply-chains-and-artisan-rights': {
    image: fieldsOfColor,
    alt: 'Artisans stretching freshly dyed crimson cloth beside grids of indigo cotton drying in a sunlit Bagru courtyard',
    caption: 'Drying fields of Bagru: madder crimson and natural indigo yardage laid out under morning sun.',
    credit: 'Bagru, Rajasthan · Studio Bagru Archive',
  },
};

export interface ArchivePlate {
  id: string;
  image: ImageMetadata;
  title: string;
  year: string;
  category: 'workshops' | 'dyes' | 'artisans' | 'field-2010';
  location: string;
  caption: string;
}

export const ARCHIVE_PLATES: ArchivePlate[] = [
  {
    id: 'fields-of-color',
    image: fieldsOfColor,
    title: 'Drying fields of madder & indigo',
    year: '2018',
    category: 'workshops',
    location: 'Bagru, Rajasthan',
    caption: 'Two printers stretching freshly dyed madder-red cotton alongside indigo-dyed yardage laid across the open courtyard.',
  },
  {
    id: 'holding-blocks',
    image: holdingBlocks,
    title: 'Multi-block alignment at the patia',
    year: '2022',
    category: 'workshops',
    location: 'Bagru, Rajasthan',
    caption: 'Stamping carved teakwood blocks across an intricate cobalt, ochre, and syahi medallion repeat.',
  },
  {
    id: 'dye-trays',
    image: dyeTrays,
    title: 'Three kunda trays: kashish, syahi & harda',
    year: '2022',
    category: 'dyes',
    location: 'Bagru, Rajasthan',
    caption: 'Felt-lined wooden color trays charged with mineral-earth kashish brown, fermented iron black, and myrobalan yellow.',
  },
  {
    id: 'printer-at-table',
    image: printerAtTable,
    title: 'Master Chhipa printer at work',
    year: '2021',
    category: 'artisans',
    location: 'Bagru, Rajasthan',
    caption: 'Hand-stamping dense floral repeats onto deep charcoal and madder cotton in a family workshop.',
  },
  {
    id: 'indigo-vat-dip',
    image: indigoVatDip,
    title: 'Dabu resist lifted from the indigo vat',
    year: '2022',
    category: 'dyes',
    location: 'Bagru, Rajasthan',
    caption: 'Clay-and-sawdust dabu dots shielding raw cotton fibers as the cloth lifts out of reduced natural indigo.',
  },
  {
    id: 'indigo-vats',
    image: indigoVats,
    title: 'Indigo factory — beating the vats (archival)',
    year: 'c. 1890',
    category: 'dyes',
    location: 'Bengal / Colonial India',
    caption: 'Historical 19th-century plate documenting workers aerating sunken indigo oxidation vats by hand.',
  },
  {
    id: 'khilana',
    image: khilana,
    title: 'Khilana by Chandrakanta Chhipa',
    year: '2018',
    category: 'artisans',
    location: 'Mahila Print, Bagru',
    caption: 'Khilana, created by Chandrakanta Chhipa, 2018, ©Mahila Print — registered under Consent, Credit, Compensation.',
  },
  {
    id: 'deepak-chhipa',
    image: deepakChhipa,
    title: 'Deepak Chhipa & carved woodblock wall',
    year: '2023',
    category: 'artisans',
    location: 'Bagru, Rajasthan',
    caption: 'Deepak Chhipa standing before hundreds of hand-chiseled teakwood motifs preserved in his family archive.',
  },
  {
    id: 'vijendra-yash',
    image: vijendraAndYash,
    title: 'Vijendra & Yash Chhipa',
    year: '2023',
    category: 'artisans',
    location: 'Bagru, Rajasthan',
    caption: 'Two generations of Chhipa printers carrying Bagru’s independent family workshops into direct global trade.',
  },
  {
    id: 'printing-ajrakh-table',
    image: printingAjrakhTable,
    title: 'Hands on the carved woodblock',
    year: '2023',
    category: 'workshops',
    location: 'Studio Bagru, Rajasthan',
    caption: 'A Bagru woman printer guiding hand pressure over the drilled hawa-khori air vents of a heavy carved block.',
  },
  {
    id: 'scarves-drying-balcony',
    image: scarvesDryingBalcony,
    title: 'Mulmul scarves in the Rajasthan breeze',
    year: '2022',
    category: 'dyes',
    location: 'Bagru, Rajasthan',
    caption: 'Freshly printed madder-rose and turmeric-gold cotton mulmul hung along a second-story workshop balcony.',
  },
  {
    id: 'drying-field-morning',
    image: dryingFieldMorning,
    title: 'Morning drying yard in Bagru',
    year: '2019',
    category: 'workshops',
    location: 'Bagru, Rajasthan',
    caption: 'Rows of newly dyed crimson, indigo, and emerald yardage spread across dry earth beneath morning sun.',
  },
  {
    id: 'jeremy-stirring-dye-2010',
    image: jeremyDye2010,
    title: 'Jeremy Fritzhand stirring the copper dye vat',
    year: '2010',
    category: 'field-2010',
    location: 'Bagru, Rajasthan',
    caption: 'Minerva Fellowship year (2010): learning botanical dye boiling first-hand at a Bagru family cauldron.',
  },
  {
    id: 'jeremy-carver-2010',
    image: jeremyCarver2010,
    title: 'Jeremy with a master block carver',
    year: '2010',
    category: 'field-2010',
    location: 'Jaipur / Bagru',
    caption: 'Inside a hereditary woodblock carver’s workshop surrounded floor-to-ceiling by seasoned teak blocks.',
  },
  {
    id: 'jeremy-field-2010',
    image: jeremyField2010,
    title: 'Indigo dabu cloth by bicycle',
    year: '2010',
    category: 'field-2010',
    location: 'Bagru, Rajasthan',
    caption: 'Hauling freshly dyed indigo cloth across Bagru’s open drying grounds in the founding year of Bagru Textiles.',
  },
  {
    id: 'priest-king',
    image: priestKing,
    title: 'The Mohenjo-daro Priest-King (trefoil cloak)',
    year: 'c. 2000 BCE',
    category: 'dyes',
    location: 'Indus Valley',
    caption: 'A 17.5 cm steatite sculpture whose repeating trefoil robe anchors the earliest evidence of patterned South Asian cloth.',
  },
];
