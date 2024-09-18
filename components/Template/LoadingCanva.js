const Loading = () => {
    return (
      <div style={{ textAlign: 'center', padding: '20px', width:'100%',margin:'auto' }}>
        <div className="spinner" />
        <style jsx>{`
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #09f;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 100px auto;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  };

export default Loading;