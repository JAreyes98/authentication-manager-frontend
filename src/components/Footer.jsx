const Footer = ({ isDark = false }) => {
  const appConfig = {
    author: "Josué Reyes",
    appVersion: "1.0.0-rc",
    backendVersion: "v2.4.0-stable",
    year: new Date().getFullYear()
  };

  const textColor = isDark ? "text-slate-500" : "text-slate-400";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`flex gap-2 text-[10px] font-medium ${textColor}`}>
        <span>GUI v{appConfig.appVersion}</span>
        <span>•</span>
        <span>API v{appConfig.backendVersion}</span>
        <span>•</span>
        <span>{appConfig.year}</span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Developed by <span className="text-blue-600"> {appConfig.author}</span>
      </span>
    </div>
  );
};

export default Footer;