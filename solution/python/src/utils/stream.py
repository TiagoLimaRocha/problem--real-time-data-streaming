import asyncio
import aiofiles
import random

CHUNK_SIZE_B: int = 1024 * 64

async def simulate_data_stream():
  for i in range(random.randint(5, 10)):
    yield i
    await asyncio.sleep(random.uniform(0.1, 1.0))

async def process_data_stream() -> list:
  try:
    processed_data: list = []
    async for data in simulate_data_stream():
      processed_data.append(data)

    return processed_data;
  except Exception as e:
    raise e

class AioStream:
  def __init__(self) -> None:
    pass

  async def read_stream(self, filename):
    async with aiofiles.open(filename, 'rb') as stream:
      while True:
        chunk: bytes = await stream.read(CHUNK_SIZE_B)

        if not chunk:
          break

        yield chunk

  async def on(self, filename, callback: callable) -> None:
    try: 
      async for chunk in self.read_stream(filename):
        callback(chunk)
    except Exception as e:
      raise e

  async def buffer(self, filename) -> bytes:
    try:  
      buffer = bytearray()

      async for chunk in self.read_stream(filename):
        buffer.extend(chunk)

      return buffer
    except Exception as e:
      raise e
    
  async def pipe(self, filename, dest) -> None:
    try:
      async with aiofiles.open(dest, 'wb') as stream:
        async for chunk in self.read_stream(filename):
          await stream.write(chunk)
    except Exception as e:
      raise e










