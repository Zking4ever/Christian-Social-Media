import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface Comment {
  id: number
  author: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
}

interface PostCardProps {
  post: {
    id: number
    author: {
      name: string
      avatar: string
      role: string
    }
    content: string
    category: string
    likes: number
    comments: number
    timestamp: string
    hasMedia?: boolean
    isLiked?: boolean
    isSaved?: boolean
  }
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isSaved, setIsSaved] = useState(post.isSaved || false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: { name: "David Miller", avatar: "/man.jpg" },
      content: "Amen! This really speaks to me today.",
      timestamp: "1 hour ago",
    },
  ])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  const handleComment = () => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: comments.length + 1,
      author: { name: "You", avatar: "/abstract-geometric-shapes.png" },
      content: commentText,
      timestamp: "Just now",
    }

    setComments([...comments, newComment])
    setCommentText("")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {post.author.role} · {post.timestamp}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Hide post</DropdownMenuItem>
              <DropdownMenuItem>Unfollow {post.author.name}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-pretty leading-relaxed">{post.content}</p>
        {post.hasMedia && (
          <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500">Media Content</span>
            </div>
        )}
        </CardContent>
    )
    }