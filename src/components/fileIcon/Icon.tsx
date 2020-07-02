import React, {
  FC,
  lazy,
  Suspense,
  Fragment,
  useMemo
} from 'react';

interface IIconProps {
  fileType: string;
  downloadUrl: string;
  name: string;
}

export const Icon: FC<IIconProps> = (props) => {
  const { fileType } = props;
  const Icon = lazy(() => import(`./icons/${fileType}`));
  return useMemo(() => {
    return (
      <Suspense fallback={<Fragment />}>
        <Icon />
      </Suspense>
    )
  }, [])
}
