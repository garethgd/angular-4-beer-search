export class Beer {
    _id: string
    title: string;
    url: string;
    description: string;
    rating: number;
    abv: string;
    labels:{
        
    }
    style: {
        category: {
            id: number,
            name: string
        }
    }
}
