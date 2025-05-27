import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>運用連絡体制WebUIシステム</h1>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} 株式会社フェアーウェイ</p>
      </footer>
    </div>
  );
};

export default Layout;
