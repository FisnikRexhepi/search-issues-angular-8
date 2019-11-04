
export interface IssueDetails  {
number: number;
title: string;
body: string;
status: string;
}

export interface Issue extends IssueDetails{
 comments: string[];
 author: string[];
}

