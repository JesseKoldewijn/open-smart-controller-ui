const Show = ({
  isVisible,
  children,
  fallback,
}: {
  isVisible: boolean;
  children: React.ReactNode;
  fallback: React.ReactNode;
}) => {
  return <>{isVisible ? children : fallback}</>;
};

export default Show;
