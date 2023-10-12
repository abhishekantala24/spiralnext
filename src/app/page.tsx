import HomeScreen from '@/component/home/HomeScreen';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spiral Home',
  description: 'We will grow up your business ',
}

const Page = () => (
  <div>
    <HomeScreen />
  </div>
)

export default Page;