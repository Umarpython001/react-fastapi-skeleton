import React from 'react';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center"
      >
        {/* Hero Section */}
        <div className="mb-5">
          <motion.h1
            className="display-3 fw-bold text-dark mb-3"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to <span className="text-primary">SkeletonStack</span>
          </motion.h1>

          <motion.p
            className="lead text-muted mx-auto"
            style={{ maxWidth: '600px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The ultimate skeleton for your next big project. Fast, scalable, and beautiful.
            Experience the power of React and FastAPI working in perfect harmony.
          </motion.p>
        </div>

        {/* CTA Section */}
        <motion.div
          className="p-5 rounded-5 shadow-sm bg-white border"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid #e9ecef'
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="h4 fw-bold text-secondary mb-4">Ready to explore?</h2>
          <p className="text-muted mb-4">Join our community of developers and start building today.</p>

          <div className="d-flex gap-3 justify-content-center">
            <motion.a
              href="/login"
              className="btn btn-primary btn-lg px-4 fw-bold shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login to see more
            </motion.a>
            <motion.a
              href="/about"
              className="btn btn-outline-secondary btn-lg px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        {/* Feature highlight blocks */}
        <div className="row mt-5 g-4 text-start">
          {[
            { title: 'Lightning Fast', desc: 'Powered by FastAPI for incredible backend performance.', icon: '⚡' },
            { title: 'Beautiful UI', desc: 'Built with React and Framer Motion for smooth animations.', icon: '🎨' },
            { title: 'Ready to Scale', desc: 'Architecture designed to grow with your user base.', icon: '🚀' },
          ].map((feature, index) => (
            <div key={index} className="col-md-4">
              <motion.div
                className="p-4 h-100 bg-white rounded-4 border shadow-sm"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="display-6 mb-3">{feature.icon}</div>
                <h3 className="h5 fw-bold">{feature.title}</h3>
                <p className="text-muted small">{feature.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
