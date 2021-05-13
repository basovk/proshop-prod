import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

const NavLink = ({ href, iconClassName, text, brand, ...rest }) => {
  const [isActive, setIsActive] = new useState(false)
  const router = useRouter()

  useEffect(() => {
    if (router && router.query) {
      setIsActive(router.pathname === href)
    }
  }, [router])

  const closeMobileHeader = () => {
    const navbarCollapses = document.getElementsByClassName('navbar-collapse')
    Array.from(navbarCollapses).forEach((navbarCollapse) => {
      navbarCollapse.className = navbarCollapse.className.replace('show', '')
    })
  }

  return (
    <div onClick={closeMobileHeader}>
      <Link href={href}>
        <a
          className={`${brand ? '' : 'nav-link'} ${
            isActive && !brand ? 'active' : ''
          }`}
          role='button'
          {...rest}
        >
          <span className={`${brand ? 'navbar-brand' : ''}`}>
            {iconClassName && (
              <>
                <i className={iconClassName} />{' '}
              </>
            )}
            {text}
          </span>
        </a>
      </Link>
    </div>
  )
}

export default NavLink
