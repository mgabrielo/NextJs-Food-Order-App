'use client'
import axios from 'axios'
import { useState, useEffect } from 'react'

export function useProfile() {
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios.get('/api/profile').then((res) => {
                if (res.status == 200 && res.data !== undefined) {
                    console.log('profile-data', res.data)
                    setData(res.data.admin)
                }
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }
        fetchData()
    }, [])

    return { loading, data }
}
