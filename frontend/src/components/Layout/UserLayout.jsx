import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      {/* header */}
      <Header />
      {/* main */}
      <main>
        <Outlet />
      </main>
      {/* footer */}
      <Footer />
    </>
  )
}

export default UserLayout
