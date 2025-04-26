import { Link } from "react-router-dom";

const Logo = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <Link to={"/"}>
      <img width={width} height={height} src="/logo/logo.png" />
    </Link>
  );
};

export default Logo;
