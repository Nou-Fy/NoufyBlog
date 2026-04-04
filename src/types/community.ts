export interface PrismaDiscussion {
  id: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  archived: boolean;
  author: {
    id: string;
    nom: string | null;
  };
  _count: {
    comments: number;
  };
}
