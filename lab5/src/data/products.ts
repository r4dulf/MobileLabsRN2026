export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Apple MacBook Pro 14"',
    price: 79999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    description:
      'Ноутбук з чипом M3 Pro, 18 ГБ RAM, 512 ГБ SSD. Ідеальний для розробників та дизайнерів. Акумулятор до 18 годин роботи.',
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5',
    price: 12499,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description:
      'Бездротові навушники з найкращим шумозаглушенням у класі. 30 годин автономної роботи, підтримка LDAC та multipoint.',
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24 Ultra',
    price: 49999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    description:
      'Флагманський смартфон з вбудованим S Pen, камерою 200 МП та чипом Snapdragon 8 Gen 3. 5000 мАг акумулятор.',
  },
  {
    id: '4',
    name: 'Apple iPad Pro 11"',
    price: 34999,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    description:
      'Планшет з чипом M4, OLED-дисплеєм та підтримкою Apple Pencil Pro. Ідеальний для творчих завдань.',
  },
  {
    id: '5',
    name: 'Logitech MX Master 3S',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    description:
      'Ергономічна бездротова миша з тихими кнопками, магнітним колесом прокрутки та підтримкою до 3 пристроїв.',
  },
  {
    id: '6',
    name: 'LG UltraWide 34"',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
    description:
      'Ультраширокий монітор 3440×1440 з частотою 160 Гц, HDR10 та підтримкою USB-C з потужністю 96 Вт.',
  },
  {
    id: '7',
    name: 'Keychron Q1 Pro',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1601445638532-1f2f98478a75?w=400',
    description:
      'Механічна клавіатура з алюмінієвим корпусом, безпровідним підключенням та Gasket mount конструкцією.',
  },
  {
    id: '8',
    name: 'DJI Mini 4 Pro',
    price: 29999,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400',
    description:
      'Компактний дрон вагою менше 249 г з камерою 4K/60fps, omnidirectional obstacle sensing та часом польоту до 34 хв.',
  },
  {
    id: '9',
    name: 'Apple Watch Ultra 2',
    price: 33999,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
    description:
      'Найдосконаліший Apple Watch з титановим корпусом, GPS подвійної частоти та батареєю до 60 годин.',
  },
  {
    id: '10',
    name: 'ASUS ROG Zephyrus G14',
    price: 59999,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
    description:
      'Ігровий ноутбук з AMD Ryzen 9, RTX 4060, OLED-дисплеєм 2880×1800 та частотою 120 Гц. Компактний та потужний.',
  },
];
