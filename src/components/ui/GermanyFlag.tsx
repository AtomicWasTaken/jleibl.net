import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

export const GermanyFlag = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <motion.div 
      role="group"
      aria-label="Theme switcher with German flag colors"
      style={{
        display: "inline-flex",
        width: "3em",
        height: "0.6em",
        marginLeft: "0.1em",
        verticalAlign: "middle",
        borderRadius: "1px",
        overflow: "hidden",
        opacity: 0.6,
        cursor: "pointer"
      }}
      whileHover={{ 
        opacity: 0.8,
        transition: { duration: 0.2 }
      }}
    >
      <motion.button
        aria-label="Switch to dark theme"
        aria-pressed={theme === 'black'}
        style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", borderLeft: "2px solid rgba(255, 255, 255, 0.1)", borderTop: "2px solid rgba(255, 255, 255, 0.1)", borderBottom: "2px solid rgba(255, 255, 255, 0.1)" }}
        onClick={() => setTheme('black')}
        className={theme === 'black' ? 'ring-1 ring-white/20' : ''}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
      <motion.button
        aria-label="Switch to red theme"
        aria-pressed={theme === 'red'}
        style={{ flex: 1, backgroundColor: "rgba(255, 0, 0)" }}
        onClick={() => setTheme('red')}
        className={theme === 'red' ? 'ring-1 ring-white/20' : ''}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
      <motion.button
        aria-label="Switch to gold theme"
        aria-pressed={theme === 'gold'}
        style={{ flex: 1, backgroundColor: "rgba(255, 204, 0)" }}
        onClick={() => setTheme('gold')}
        className={theme === 'gold' ? 'ring-1 ring-white/20' : ''}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
    </motion.div>
  );
}; 