"use client";


export default function SmoothScrollLink({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode 
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 120, // Adjust for header height
        behavior: 'smooth'
      });
      
      // Update URL without reloading
      if (history.pushState) {
        history.pushState(null, '', href);
      } else {
        window.location.hash = href;
      }
    }
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}