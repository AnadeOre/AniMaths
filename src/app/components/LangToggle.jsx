import styles from '../styles/layout.module.css';
import {GB, AR} from 'country-flag-icons/react/3x2';
import {useSelector, useDispatch} from 'react-redux';
import {changeLang} from '../LangSlice';

function LangToggle() {
  const lang = useSelector((state) => state.langToggle.value);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (lang === 'es') dispatch(changeLang('en'));
    else dispatch(changeLang('es'));
  };

  return (
    <div onClick={handleClick}>
      {lang === 'es' ? (
        <div>
          <div className={styles.faded}>
            <GB />
          </div>
          <div>
            <AR />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <GB />
          </div>
          <div className={styles.faded}>
            <AR />
          </div>
        </div>
      )}
    </div>
  );
}

export default LangToggle;
