import { Stack } from '@mui/material';
import About from './About';
import Feature from './components/Feature';
import Hero from './components/Hero';
import Contact from './Contact';
import Outreach from './Outreach';
import { useEffect, useState } from 'react';
import { getHomePageContent } from '@/api/homePageApi';
import DefaultImage from '@/assets/images/temple-8.jpg';

const Home = () => {
  const defaultContent = `A Kula Devata (family deity) - The word is derived from two words: Kula, meaning clan and devata, meaning deity. 
    It refers to the ancestral tutelary deity worshipped by a particular kula (clan) and gotra (lineage). 
    This deity acts as a guardian, protecting the entire lineage of the clan from misfortunes (daridram) and evil 
    influences like black magic, the evil eye, and depression. Worshiping the Kula Devata is deeply significant, 
    as it strengthens the bond between the family and the deity, ensuring blessings and protection. Many people face 
    hardships despite visiting various temples and astrologers, often because they have forgotten their Kula Devata. 
    While no deity will harm you for neglecting worship, reconnecting with your family deity is essential, especially 
    if your family is facing difficulties. Ideally, family members should visit the Kula Devata’s temple at least once 
    a year. If your cousins or paternal relatives continue the worship and include your details in rituals (pooja/sankalpa), 
    the protection remains. However, if the entire extended family loses touch with the deity, it is crucial to reestablish 
    the connection without delay. By tradition, a father’s Kula Devata is inherited by the son, passing through generations. 
    A married daughter adopts her husband’s Kula Devata. However, if one is unaware of the father's family deity, worshiping 
    the mother’s Kula Devata with full devotion is an alternative. Ultimately, faith is the core of this practice—whichever 
    deity one believes in should bring solace, peace, and strength. Kula Devata Upasana (personal deity worship) is a powerful 
    method to handle karma. Ignoring it is like neglecting a doctor despite an illness. While some people may lead an apparently 
    peaceful life despite not undertaking any upasana, most people require spiritual guidance to heal their karmic burdens. 
    To restore divine blessings, ensure that your family maintains Kula Devata worship—for protection, peace, and prosperity.`;

  const [data, setData] = useState({
    title: 'Honoring Our Kula Devata – Together',
    content: defaultContent,
    imageUrl: DefaultImage,
  });
  const [loading, setLoading] = useState(true);

  const fetchHomepage = async () => {
    try {
      const res = await getHomePageContent();
      setData({
        title:
          res.data.title ||
          'Honoring Our Kula Devata – Together',
        content: res.data.content || defaultContent,
        imageUrl: res.data.imageUrl
          ? `/uploads/${res.data.imageUrl}`
          : DefaultImage,
      });
    } catch (err) {
      console.error(
        'Error loading homepage content',
        err.message
      );
      setData({
        title: 'Honoring Our Kula Devata – Together',
        content: defaultContent,
        imageUrl: DefaultImage,
      });
    } finally {
      setLoading(false);
    }
  };
  console.log('Home');
  useEffect(() => {
    console.log('Hi');
    fetchHomepage();
  }, []);

  return (
    <Stack className='overflow-hidden'>
      <Stack gap={5} id='home' className='p-5 md:p-10 '>
        <Hero />
        <Feature />
      </Stack>

      <About data={data} loading={loading} />

      <Outreach />
      <Contact />
    </Stack>
  );
};

export default Home;
