import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'

const EditPost = () => {
    const [post, setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])
    
  return post.length != 0 ? (
    <div className='py-8'>
        <Container>
        <PostForm post={post}/>
        </Container>
    </div>
  ) : <div>Loading...</div>
}

export default EditPost
