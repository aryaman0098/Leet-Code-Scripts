import { request, gql } from 'graphql-request'
import fs from 'fs'  

const fetch = async (titleSlug) => {
  const endpoint = 'https://leetcode.com/graphql/'

  const query = gql`
    query questionContent($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
          content 
      }
    }
  `
  const variables = {
    titleSlug: titleSlug,
  }

  const data = await request(endpoint, query, variables)
  return data
}

const parse = (content) => {
  return content.trim().replace('\n', '').replace('\t', '')
}

const run = async (titleSlug) => {
  const response = await fetch(titleSlug)

  if(response.question.content) {
    const parsedContent = parse(response.question.content)

    fs.appendFileSync(`${titleSlug}.md`, parsedContent)
  } else {
    console.log(`Question content not fount for ${titleSlug}`)
  }
}

run('rotting-oranges')
