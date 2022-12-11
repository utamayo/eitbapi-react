import { useAsync } from '../hooks';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ClipLoader from 'react-spinners/ClipLoader';
import { FormattedMessage } from 'react-intl';
import { getTVCategoryProgramPlaylist, getTVCategory } from '../api';
import { sort_by_key } from '../helpers/utils';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const TVCategoryProgram = () => {
  const { langCode: language } = useSelector((state) => state.language);
  const { category_id, program_id } = useParams();

  const { triggerFunction, data, loaded } = useAsync();
  const {
    triggerFunction: triggerFunctionCategory,
    data: dataCategory,
    loaded: loadedCategory,
  } = useAsync();

  useEffect(() => {
    triggerFunction(getTVCategoryProgramPlaylist, program_id);
  }, [program_id, triggerFunction]);

  useEffect(() => {
    triggerFunctionCategory(getTVCategory, category_id);
  }, [category_id, triggerFunctionCategory]);

  console.log('data', data);
  console.log('dataCategory', dataCategory);

  return (
    <Container>
      {loadedCategory ? (
        <Container>
          <h1>{data.name}</h1>
          <h2>
            <FormattedMessage id="tvs.Playlists" defaultMessage="Playlists" />
          </h2>

          <ul>
            {sort_by_key(data.playlist, 'name').map((item, index) => {
              return (
                <li key={`${index}`}>
                  <Link
                    to={`/${language}/tvs/${category_id}/${program_id}/${item.id}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      ) : (
        <ClipLoader />
      )}
    </Container>
  );
};
