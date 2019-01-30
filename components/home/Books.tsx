import React, { Fragment, useContext } from 'react';
import { Flex, Text } from 'rebass';
import Card from '../Card';
import CardHeading from '../CardHeading';
import CardText from '../CardText';
import Divider from '../Divider';
import Icon, { IconProps } from '../Icon';
import Link from '../Link';
import ProgressRing from '../ProgressRing';
import Section from '../Section';
import { ThemeContext } from '../Theme';
import Star from '../../icons/star.svg';
import { css } from '../../lib/styled-components';

type BooksProps = {
  books: Book[];
};

const Books: React.FC<BooksProps> = ({ books }) => {
  const { darkMode } = useContext(ThemeContext);

  // Shelves
  const shelves = [
    { id: 'currently-reading', title: 'Currently reading' },
    { id: 'read', title: 'Finished reading' },
  ];

  return (
    <Section title="Books">
      {shelves.map((shelf, index) => {
        const booksInShelf = books.filter(book => book.shelf === shelf.id);

        return (
          <Fragment key={shelf.id}>
            <Divider
              css={css`
                grid-column: span 2;
              `}
              mb={-1}
              mt={index === 0 ? 0 : 2}
            >
              {shelf.title}
            </Divider>
            {booksInShelf.map(
              ({ id, imageUrl, link, progress, rating, title }) => (
                <Link
                  css={css`
                    grid-column: span 2;
                  `}
                  href={link}
                  key={id}
                  target="_blank"
                >
                  <Card image={{ src: imageUrl, alt: title }} type="light">
                    <CardHeading>{title}</CardHeading>
                    <Flex alignItems="center" mt="auto">
                      {progress && (
                        <Text
                          color={darkMode ? 'yellow50' : 'yellow'}
                          css={css`
                            display: flex;
                          `}
                          mr={2}
                        >
                          <ProgressRing progress={progress} />
                        </Text>
                      )}
                      <CardText color={darkMode ? 'gray25' : 'gray'}>
                        {progress && `${progress * 100}% done`}
                        {Array(rating)
                          .fill((props: IconProps) => (
                            <Icon
                              as={Star}
                              color={darkMode ? 'yellow50' : 'yellow'}
                              {...props}
                            />
                          ))
                          .map((Rating, index) => (
                            <Rating key={index} ml={index === 0 ? 0 : 1} />
                          ))}
                      </CardText>
                    </Flex>
                  </Card>
                </Link>
              ),
            )}
          </Fragment>
        );
      })}
    </Section>
  );
};

export default Books;
