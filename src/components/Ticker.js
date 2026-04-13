import React, { useMemo } from 'react';
import styles from './Ticker.module.css';

import {
  FaRocket,
  FaChartLine,
  FaSearch,
  FaMobileAlt,
  FaBolt,
  FaPaintBrush,
  FaGlobe,
  FaHandshake,
  FaChartBar,
  FaLightbulb,
  FaBullseye,
  FaSync
} from 'react-icons/fa';

const ITEMS = [
  { icon: <FaRocket />, text: 'Google Ads' },
  { icon: <FaChartLine />, text: 'Meta Ads' },
  { icon: <FaSearch />, text: 'SEO' },
  { icon: <FaMobileAlt />, text: 'Social Media' },
  { icon: <FaBolt />, text: 'Marketing Automation' },
  { icon: <FaPaintBrush />, text: 'Branding' },
  { icon: <FaGlobe />, text: 'Sites Web' },
  { icon: <FaHandshake />, text: 'Influenceurs' },
  { icon: <FaChartBar />, text: 'Analytics' },
  { icon: <FaLightbulb />, text: 'Stratégie Digitale' },
  { icon: <FaBullseye />, text: 'Acquisition Client' },
  { icon: <FaSync />, text: 'Retargeting' },
];

export default function Ticker() {
  const doubled = useMemo(() => [...ITEMS, ...ITEMS], []);

  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.text}>{item.text}</span>
            <span className={styles.sep}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}