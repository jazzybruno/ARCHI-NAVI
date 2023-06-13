import { ReactElement } from "react"

type LayoutProps = {
  readonly children: ReactElement
}

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <header>建築学生のための就活情報サイト</header>
      <main>
        { children }
      </main>
      <footer>Copyright xxxxxxxxx</footer>
    </>
  )
}