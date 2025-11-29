import { useRouter } from 'next/router'
import { Div } from 'atomize'

const Back = ({themeUse}) => {
  const router = useRouter();
  const handleBack = () => {
    router.back(); 
  };

  return (
        <Div
          onClick={handleBack}
          m={{ t: "0.5em" }}
          textColor={themeUse.secondary}
          hoverTextColor={themeUse.hover}
          cursor="pointer"
          transition
        >
          ← Quay lại
        </Div>
  )
}

export default Back