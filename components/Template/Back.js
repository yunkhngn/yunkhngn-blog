import Link from 'next/link'
import { Div } from 'atomize'

const Back = ({themeUse, route}) => {
  return (
    <Link href={route} passHref scroll={true}>
        <Div
          m={{ t: "0.5em" }}
          textColor={themeUse.secondary}
          hoverTextColor={themeUse.hover}
          transition
        >
          Quay lại...
        </Div>
      </Link>
  )
}

export default Back