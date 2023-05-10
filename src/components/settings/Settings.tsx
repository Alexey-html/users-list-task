import React from 'react';
import chartsImg from '../../images/charts-img.jpg';
import settingImg from '../../images/setting-img.png';
import styles from './Settings.module.css';

export function Settings() {
  document.title = "StreamDat App | Настройки";
  return (
    <>
      <h1 className={styles.h1}>Настройки</h1>
      <div className={styles.settingsBlock}>
        <p><img src={settingImg} alt="" />Настройка — процесс, в результате которого устанавливается значение параметров или характеристик устройства или системы, предусмотренное нормативно-техническим документом.</p>

        <p>Изменение в заданных техническими условиями пределах параметров прибора, машины, устройства, обычно в процессе эксплуатации при переходе на новый режим работы (в отличие от наладки, целью которой является обеспечение нормального функционирования объекта).</p>

        <div className={styles.settingsImg}>
          <img src={chartsImg} alt="" />
        </div>
        <p>В необходимых случаях настройка может проводиться в более жёстких по сравнению с нормальной эксплуатацией условиях с целью проверки работоспособности наиболее ненадёжных и важных соответствующей технической документацией (технический паспорт, протокол испытаний, акт приемки) при выпуске или сдаче объекта в эксплуатацию.</p>
      </div>
    </>
  );
}