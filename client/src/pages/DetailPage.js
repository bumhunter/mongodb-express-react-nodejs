import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../components/Loader"
import {LinkCard} from "../components/LinkCard"

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)  // хук, доставляющий саму ссылку
  const linkId = useParams().id  // ключ id мы задали в routes

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, // endpoint получаем в link.routes.js
      'GET', null, {
       Authorization: `Bearer ${token}` // token добавляется в зависимость
      })
      setLink(fetched)
    } catch (e) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()  // вместо useCallback getLink можно получить здесь
  }, [getLink])

  if (loading) {
    return <Loader />
  }
  return (
    <>
      { !loading && link && <LinkCard link={link} /> }
    </>
  )
}