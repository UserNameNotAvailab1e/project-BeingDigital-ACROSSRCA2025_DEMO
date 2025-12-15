import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from './store/useAppStore';
import { Layout } from './components/Core/Layout';
import { Attraction } from './components/States/1_Attraction';
import { Configuration } from './components/States/2_Configuration';
import { Trigger } from './components/States/3_Trigger';
import { Consumption } from './components/States/4_Consumption';
import { Receipt } from './components/States/5_Receipt';

function App() {
  const currentState = useAppStore((state) => state.currentState);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {currentState === 'IDLE' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <Attraction />
          </motion.div>
        )}

        {/* We will add other states here as we build them */}
        {currentState === 'CONFIG' && (
          <motion.div
            key="config"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <Configuration />
          </motion.div>
        )}

        {currentState === 'PROCESSING' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} // Fast exit/enter for glitch
            className="w-full h-full"
          >
            <Trigger />
          </motion.div>
        )}

        {currentState === 'EXPERIENCE' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <Consumption />
          </motion.div>
        )}

        {currentState === 'RECEIPT' && (
          <motion.div
            key="receipt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <Receipt />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Temporary Debugger to switch states */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2 font-mono text-xs opacity-50 hover:opacity-100 transition-opacity">
        <button onClick={() => useAppStore.getState().setState('IDLE')}>IDLE</button>
        <button onClick={() => useAppStore.getState().setState('CONFIG')}>CONFIG</button>
        <button onClick={() => useAppStore.getState().setState('PROCESSING')}>PROC</button>
        <button onClick={() => useAppStore.getState().setState('EXPERIENCE')}>EXP</button>
        <button onClick={() => useAppStore.getState().setState('RECEIPT')}>RCPT</button>
      </div>
    </Layout>
  );
}

export default App;
