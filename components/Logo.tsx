import Image from 'next/image';

export default function Logo() {
  return (

      <div className="h-16 w-auto relative">
        <Image
          src="/wordmark-dark.svg"
          alt="set4"
          fill
          className="object-contain object-left"
        />
      </div>

  );
}
