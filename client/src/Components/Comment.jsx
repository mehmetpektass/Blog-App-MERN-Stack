import React, { useEffect, useState } from 'react'

const Comment = ({comment}) => {
    const [user , setUser] = useState({});

    useEffect(() => {
        const fetchTheUser = async () => {
            try {
                const res = await fetch(`/api/user/getusers?_id=${comment.userId}`)
                const data = await res.json();
                if (res.ok) {
                    setUser(data.users[0])
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchTheUser();
    },[comment])

  return (
    <div>{user.username}</div>
  )
}

export default Comment